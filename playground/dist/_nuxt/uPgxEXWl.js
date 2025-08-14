import{_ as S}from"./CWGaev_T.js";import v from"./BtbvkSz5.js";import{_ as b}from"./CpeTLepC.js";import{_ as x}from"./CGUWlA9l.js";import w from"./B-F_CX82.js";import{_ as F,c as m,e as t,d as e,w as I,F as y,b as H,h as k,a as _,n as q,t as C,v as $,x as j}from"./DNDMXCnN.js";import"./Nq-7FOXf.js";import"./7IzF0dRf.js";import"./BIGzIw_i.js";import"./BaoObWHg.js";const B={setup(){return{}},data(){return{config:{maxSize:5,width:[200,1500],height:[200,1500]},images:[]}},methods:{onSelect(n){console.log(n.files),n.files.forEach(l=>{l.type.includes("image")&&this.images.push(l)});let i=n.errors??[];if(i.length>0){const l=[...new Map(i.map(r=>[r.file,r])).values()].length,p=l==1?"file":"files";this.$toast.warning(`${l} ${p} could not be retrieved. ${i[0].message}`)}},onSubmit(){const n=this.$refs.image;console.log(n.images)}}},o=n=>($("data-v-6be38e5d"),n=n(),j(),n),P={class:"row"},z={class:"col-lg-8 space-y-3"},V=o(()=>e("div",{class:"form-label required"},"Photo Profile",-1)),D=o(()=>e("div",null,[e("h4",{class:"mb-0"},"Select File or Drag Here"),e("p",null,"You can either click to select a file or simply drag it into this area.")],-1)),E=[D],N=o(()=>e("br",null,null,-1)),U=o(()=>e("br",null,null,-1)),A={class:"gallery"},G=["src","alt"],L=o(()=>e("br",null,null,-1)),M=o(()=>e("hr",null,null,-1)),Y=o(()=>e("br",{class:"mb-6"},null,-1));function J(n,i,l,p,r,s){const g=S,u=v,d=b,a=x,f=w,h=k;return _(),m("div",null,[t(g,{title:"File Handler"}),e("div",P,[e("div",z,[t(u,{attrs:["accept","multiple","config","draggable","disabled","@select"]}),e("div",null,[V,t(d,{config:r.config,draggable:"",multiple:"",onSelect:s.onSelect},{default:I(({dragged:c})=>[e("div",{class:q(["file-handler",{dragged:c}])},E,2)]),_:1},8,["config","onSelect"])]),t(a,{class:"mt-3",code:`<FileHandler draggable multiple \r
    :config="{ maxSize: 5, width: [300, 1200], height: [300, 2000] }" \r
    accept="image:jpg,jpeg,png|audio:mp3,wav" @select="onSelect">\r
    // create you own custom style here\r
</FileHandler>\r
\r
//  accept: \r
        image:jpg,jpeg,png\r
        audio:mp3,wav\r
        text:plain,csv\r
        video:mp4\r
        application:pdf,xlxs\r
`}),t(a,{class:"mt-3",code:`onSelect(event: any) {\r
    this.images = event.files // data: { return { images: [] }}\r
\r
    let errors = event.errors ?? []\r
    if (errors.length > 0) {\r
        this.$toast.warning(errors[0].message)\r
    }\r
}`}),N,t(d,{onSelect:s.onSelect,config:{label:"Select File",required:!0}},null,8,["onSelect"]),t(a,{code:'<FileHandler :config="{}" @select="onSelect" />'}),U,e("ul",A,[(_(!0),m(y,null,H(r.images,c=>(_(),m("li",null,[e("img",{src:c.data,alt:c.name},null,8,G),e("h5",null,C(c.name),1)]))),256))]),L,t(d,{onSelect:s.onSelect,accept:"audio:mp3,wav,mpeg|video:mp4,avi,mov",config:{label:"Select Audio/Video",required:!0}},null,8,["onSelect"]),t(a,{code:'<FileHandler :config="{}" @select="onSelect" accept="audio:mp3,wav,mpeg|video:mp4,avi,mov" />'}),M,t(f,{label:"Select Images",required:"",config:r.config,multiple:"",draggable:"",ref:"image"},null,8,["config"]),t(a,{code:'<ImageUploader label="Select Images" required :config="config" multiple draggable />'}),Y,e("div",null,[t(h,{label:"Get Image",onClick:s.onSubmit},null,8,["onClick"])])])])])}const ne=F(B,[["render",J],["__scopeId","data-v-6be38e5d"]]);export{ne as default};
