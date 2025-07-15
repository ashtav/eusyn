import{_ as u}from"./WTB4IyB2.js";import h from"./Drx4Z4O9.js";import{_ as f}from"./SHuDVIHC.js";import{_ as v}from"./CTt-Tvga.js";import{_ as S,c as d,e as n,d as t,w as b,F as x,b as w,a as g,n as F,t as y,v as D,x as H}from"./BRK7ou47.js";import"./C2gVsTyf.js";import"./CA31JK_L.js";const j={setup(){return{}},data(){return{dragover:!1,images:[]}},methods:{onDragged(e){this.dragover=e.dragover,e.dragover||this.onSelect(e)},onSelect(e){console.log(e.files),e.files.forEach(s=>{s.type.includes("image")&&this.images.push(s)});let l=e.errors??[];l.length>0&&this.$toast.warning(l[0].message)}}},a=e=>(D("data-v-b3b8bb82"),e=e(),H(),e),I={class:"row"},k={class:"col-lg-8 space-y-3"},z=a(()=>t("div",null,[t("h4",{class:"mb-0"},"Select File or Drag Here"),t("p",null,"You can either click to select a file or simply drag it into this area.")],-1)),B=[z],C=a(()=>t("br",null,null,-1)),V=a(()=>t("br",null,null,-1)),q={class:"gallery"},E=["src","alt"],N=a(()=>t("br",null,null,-1));function P(e,l,s,A,p,r){const m=u,_=h,c=f,o=v;return g(),d("div",null,[n(m,{title:"File Handler"}),t("div",I,[t("div",k,[n(_,{attrs:["accept","multiple","config","draggable","disabled","output:base64|file"]}),n(c,{accept:"image:jpg,jpeg,png",config:{maxSize:5,width:[300,1200],height:[300,2e3]},draggable:"",multiple:"",onDragged:r.onDragged,onSelect:r.onSelect},{default:b(()=>[t("div",{class:F(["file-handler",{dragover:p.dragover}])},B,2)]),_:1},8,["onDragged","onSelect"]),n(o,{class:"mt-3",code:`<FileHandler draggable multiple \r
    :config="{ maxSize: 5, width: [300, 1200], height: [300, 2000] }" \r
    accept="image:jpg,jpeg,png|audio:mp3,wav" \r
    @dragged="onDragged" @select="onSelect">\r
    // create you own custom style here\r
</FileHandler>\r
\r
//  accept: \r
        image:jpg,jpeg,png\r
        audio:mp3,wav\r
        text:plain,csv\r
        video:mp4\r
        application:pdf,xlxs\r
`}),n(o,{class:"mt-3",code:`onDragged(event: any) {\r
    this.dragover = event.dragover // data: { return { dragover: false }}\r
\r
    if (!event.dragover) {\r
        this.onSelect(event)\r
    }\r
}\r
\r
onSelect(event: any) {\r
    this.images = event.files // data: { return { images: [] }}\r
\r
    let errors = event.errors ?? []\r
    if (errors.length > 0) {\r
        this.$toast.warning(errors[0].message)\r
    }\r
}`}),C,n(c,{onSelect:r.onSelect,config:{label:"Select File",required:!0}},null,8,["onSelect"]),n(o,{code:'<FileHandler :config="{}" @select="onSelect" />'}),V,t("ul",q,[(g(!0),d(x,null,w(p.images,i=>(g(),d("li",null,[t("img",{src:i.data,alt:i.name},null,8,E),t("h5",null,y(i.name),1)]))),256))]),N,n(c,{onSelect:r.onSelect,accept:"audio:mp3,wav,mpeg|video:mp4,avi,mov",config:{label:"Select Audio/Video",required:!0}},null,8,["onSelect"]),n(o,{code:'<FileHandler :config="{}" @select="onSelect" accept="audio:mp3,wav,mpeg|video:mp4,avi,mov" />'})])])])}const O=S(j,[["render",P],["__scopeId","data-v-b3b8bb82"]]);export{O as default};
