import"./assets/styles-ba826123.js";import{i as s}from"./assets/vendor-d07556bb.js";document.querySelector(".form").addEventListener("submit",function(r){r.preventDefault();const t=parseInt(document.querySelector('input[name="delay"]').value),i=document.querySelector('input[name="state"]:checked').value;new Promise((e,o)=>{setTimeout(()=>{i==="fulfilled"?e(t):o(t)},t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e} ms`})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e} ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
