<!-- Scripts -->
<!-- build:js build/js/main.js -->
<script src="https://unpkg.com/jquery@1.11.1/dist/jquery.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/swig@1.4.2/dist/swig.min.js"></script>
<script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
{{ js('js/lang_select') }}
{{ js('js/toc') }}
{{ js('js/mobile_nav') }}
{{ js('js/data') }}
{{ js('js/carousel') }}
{{ js('js/share')}}
{{ js('js/mta')}}
<!-- endbuild -->
{% if page.layout === 'plugins' %}
<!-- Plugin search -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.1.2/lunr.min.js"></script>
<!-- Lazy load -->
<script async src="https://cdn.jsdelivr.net/lazysizes/3.0.0/lazysizes.min.js"></script>
<!-- build:js build/js/plugins.js -->
{{ js('js/plugins') }}
<!-- endbuild -->
{% endif %}
