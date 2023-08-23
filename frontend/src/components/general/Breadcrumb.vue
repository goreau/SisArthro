<template>
  <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
    <ul>
        <li v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" :class="{'is-active': idx == quant }">
            <a :href="breadcrumb.link" >{{ breadcrumb.name }}</a>
        </li>



    <!--  <li
      v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}">

        {{ breadcrumb.name }}

      </li>-->
    </ul>
</nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: [],
      quant: 0,
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () { this.updateList() } },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () { 
        let rota = this.$route;
        if (!rota.meta.breadcrumb) return;
        if(rota.meta.breadcrumb.root){
            this.breadcrumbList = [{name: rota.meta.breadcrumb.name, link: rota.href }]
        } else {
          const pos = this.breadcrumbList.map(e => e.name).indexOf(rota.meta.breadcrumb.name);
          if (pos < 0) {
            this.breadcrumbList.push({name: rota.meta.breadcrumb.name, link: rota.href })
          } else {          
            this.breadcrumbList.splice(pos+1);
          }
            
        }
        this.quant = this.breadcrumbList.length - 1;
       // this.breadcrumbList = this.$route.meta.breadcrumb; 
        //console.log(this.breadcrumbList);
    }
  }
}
</script>

<style scoped>
.breadcrumb li.is-active a {
    color: #e6d964;
    cursor: default;
    pointer-events: none;
}
.breadcrumb li a {
    color: #f8f405;
    cursor: pointer;
}
 /* .breadcrumb {}
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul > li {
    display: flex;
    float: left;
    height: 10px;
    width: auto;
    color: $default;
    font-weight: bold;
    font-size: .8em;
    cursor: default;
    align-items: center;
  }

  ul > li:not(:last-child)::after {
    content: '/';
    float: right;
    font-size: .8em;
    margin: 0 .5em;
    color: $light-default;
    cursor: default;
  }

  .linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
  }*/
</style>