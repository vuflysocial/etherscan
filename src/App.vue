<template>
  <div class="container border">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-2">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"> SatoshiTURK.Com </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
              <a class="nav-link active" href="/">Ana Sayfa</a>
            </li>
            <li class="nav-item">
              <router-link to="/block" class="nav-link">Bloklar</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/transfer" class="nav-link">Transferler</router-link>
            </li>
          </ul>
          <form class="d-flex w-50">
            <input class="form-control me-2" type="search" placeholder="Address veya Txn Hash Arayın" aria-label="Search" v-model="arama">
            <button class="btn btn-outline-success" type="button" @click="ara">Ara</button>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>

</template>


<script>
export default {
  data () {
    return {
      arama:''
    }
  },
  methods : {
    ara(){

      this.$router.push({name:'detail',params:{txid:this.arama}})

    }
  }
}
</script>
