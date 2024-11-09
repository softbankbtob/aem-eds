import{jsxs as c,jsx as n}from"@dropins/tools/preact-jsx-runtime.js";import{classes as b}from"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{useState as C,useCallback as y}from"@dropins/tools/preact-hooks.js";import{InLineAlert as x,Header as p}from"@dropins/tools/components.js";import{B as f}from"./UpdatePasswordForm.js";/* empty css                       */import{r as E}from"./resendConfirmationEmail.js";import{useText as d}from"@dropins/tools/i18n.js";const _=({userEmail:r,handleSetInLineAlertProps:i})=>{const a=d({emailConfirmationMessage:"Auth.Notification.emailConfirmationMessage",technicalErrorSendEmail:"Auth.Notification.technicalErrors.technicalErrorSendEmail"}),[l,e]=C(!1);return{handleEmailConfirmation:y(async()=>{var o,m;if(e(!0),r){const t=await E(r);if(t){const u=(o=t==null?void 0:t.errors)==null?void 0:o.length,h=(m=t==null?void 0:t.data)==null?void 0:m.resendConfirmationEmail;i(u?{type:"error",text:a.technicalErrorSendEmail}:{type:h?"success":"error",text:a.emailConfirmationMessage})}}e(!1)},[i,a,r]),disabledButton:l}},$=({formSize:r,userEmail:i,inLineAlertProps:a,hideCloseBtnOnEmailConfirmation:l,handleSetInLineAlertProps:e,onPrimaryButtonClick:s})=>{const o=d({title:"Auth.EmailConfirmationForm.title",subtitle:"Auth.EmailConfirmationForm.subtitle",mainText:"Auth.EmailConfirmationForm.mainText",buttonPrimary:"Auth.EmailConfirmationForm.buttonPrimary",buttonSecondary:"Auth.EmailConfirmationForm.buttonSecondary"}),{handleEmailConfirmation:m,disabledButton:t}=_({userEmail:i,handleSetInLineAlertProps:e});return c("div",{className:b(["auth-email-confirmation-form",`auth-email-confirmation-form--${r}`]),children:[a.text?n(x,{className:"auth-signInForm__notification",type:a.type,variant:"secondary",heading:a.text,icon:a.icon,"data-testid":"authInLineAlert"}):null,n(p,{title:o.title,divider:!1,className:"auth-email-confirmation-form__title"}),i!=null&&i.length?n("span",{className:"auth-email-confirmation-form__subtitle",children:`${o.subtitle} ${i}`}):null,n("span",{className:"auth-email-confirmation-form__text",children:o.mainText}),c("div",{className:"auth-email-confirmation-form__buttons",children:[n(f,{type:"button",variant:"tertiary",style:{padding:0},buttonText:o.buttonSecondary,enableLoader:!1,onClick:m,disabled:t}),l?null:n(f,{type:"submit",buttonText:o.buttonPrimary,variant:"primary",enableLoader:!1,disabled:t,onClick:s})]})]})};export{$ as E};