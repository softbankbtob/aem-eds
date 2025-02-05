import { fetchPlaceholders } from '../../scripts/aem.js';

// button-containerクラスのdivからhrefを取得し、削除する関数
function removeButtonContainer(block) {
  const buttonContainers = block.querySelectorAll('.button-container');

  buttonContainers.forEach((buttonContainer) => {
    // const href = buttonContainer.querySelector('a')?.getAttribute('href'); // pタグ内のaタグからhrefを取得
    // if (href) {

    // }
    buttonContainer.remove(); // divを削除
  });
}

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-slide');

  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const indicators = block.querySelectorAll('.carousel-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  const slidesWrapper = block.querySelector('.carousel-slides');
  const totalSlides = slides.length;

  let realSlideIndex = slideIndex;
  if (slideIndex >= totalSlides) {
    realSlideIndex = 0;
  }

  // インジケーターの更新
  const indicators = block.querySelectorAll('.carousel-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx === realSlideIndex) {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    } else {
      indicator.querySelector('button').removeAttribute('disabled');
    }
  });

  if (slideIndex >= totalSlides) {
    // 最後のスライドから最初に戻る場合
    const lastSlideWidth = slides[totalSlides - 1].offsetWidth;
    const additionalSlide = slides[0].cloneNode(true);
    slidesWrapper.appendChild(additionalSlide);

    slidesWrapper.scrollTo({
      left: (totalSlides) * lastSlideWidth,
      behavior: 'smooth',
    });

    setTimeout(() => {
      slidesWrapper.style.scrollBehavior = 'auto';
      slidesWrapper.scrollTo(0, 0);
      additionalSlide.remove();
      slidesWrapper.style.scrollBehavior = 'smooth';
    }, 900);
  } else {
    slidesWrapper.scrollTo({
      left: slides[realSlideIndex].offsetLeft,
      behavior: 'smooth',
    });
  }

  block.dataset.activeSlide = realSlideIndex;
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
  if (!slideIndicators) return;

  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
  });

  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });
  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) updateActiveSlide(entry.target);
    });
  }, { threshold: 0.5 });
  block.querySelectorAll('.carousel-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex, carouselId, href) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-slide');

  // 新しいaタグを作成し、hrefを設定
  const newLink = document.createElement('a');
  newLink.href = href; // hrefを設定

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    // if column contains an a tag, skip it
    if (column.querySelector('a')) return;

    column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
    newLink.append(column); // aタグにcolumnを追加
    // slide.append(column);
  });
  slide.appendChild(newLink); // liにaタグを追加

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

let carouselId = 0;
export default async function decorate(block) {
  removeButtonContainer(block);
  carouselId += 1;
  block.setAttribute('id', `carousel-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  const isSingleSlide = rows.length < 2;

  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    const slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-slide-indicators');
    slideIndicatorsNav.append(slideIndicators);
    block.append(slideIndicatorsNav);

    const slideNavButtons = document.createElement('div');
    slideNavButtons.classList.add('carousel-navigation-buttons');
    slideNavButtons.innerHTML = `
      <button type="button" class= "slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
    `;

    container.append(slideNavButtons);
  }

  rows.forEach((row, idx) => {
    const a = row.querySelector('a'); // aタグを取得
    const href = a?.getAttribute('href'); // hrefを取得
    const slide = createSlide(row, idx, carouselId, href);
    slidesWrapper.append(slide);

    if (slideIndicators) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
      slideIndicators.append(indicator);
    }
    row.remove();
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    bindEvents(block);
  }

  // 一時停止ボタンの作成
  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.classList.add('pause-button');
  pauseButton.innerHTML = '<img src="../icons/pause.svg" alt="一時停止アイコン">'; // アイコンを使用
  slideIndicators.append(pauseButton); // インジケーターに追加
  // 自動スライドの設定
  let autoSlideInterval = setInterval(() => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  }, 5000); // 5秒ごとに次のスライドに移動

  // 一時停止ボタンのクリックイベント
  let isPaused = false; // 一時停止状態を管理するフラグ
  pauseButton.addEventListener('click', () => {
    if (isPaused) {
      // 再開
      autoSlideInterval = setInterval(() => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
      }, 5000);
      pauseButton.innerHTML = '<img src="../icons/pause.svg" alt="一時停止アイコン">';
    } else {
      // 一時停止
      clearInterval(autoSlideInterval);
      pauseButton.innerHTML = '<img src="../icons/play.svg" alt="再生アイコン">';
    }
    isPaused = !isPaused; // 状態を反転
  });
}