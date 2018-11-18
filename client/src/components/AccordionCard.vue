<template>
    <!--Accordion wrapper-->
    <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">

        <!-- Accordion card -->
        <div class="card">

            <!-- Card header -->
            <div class="card-header elegant-color" role="tab" id="headingTwo2">
                <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseTwo2"
                    aria-expanded="false" aria-controls="collapseTwo2">
                    <h5 class="mb-0 text-white row d-flex">
                        <i class="fas fa-user mr-auto ml-2"></i><i class="fa fa-angle-down rotate-icon mr-2"></i>
                    </h5>
                </a>
            </div>

            <!-- Card body -->
            <div id="collapseTwo2" class="collapse" role="tabpanel" aria-labelledby="headingTwo2" data-parent="#accordionEx">
                <div class="card-body row d-flex flex-column justify-content-center">
                    <router-link :to="{name : 'PostArticle'}" class="btn rgba-blue-strong"><i class="fas fa-pencil-alt"></i>&nbsp;Post Article</router-link>
                    <router-link :to="{name : 'MyArticle'}" class="btn rgba-blue-strong"><i class="fas fa-list-ul"></i>&nbsp;My Article</router-link>
                </div>
            </div>

        </div>
    </div>
    <!-- Accordion wrapper -->
</template>

<script>
export default {
    
}
</script>

