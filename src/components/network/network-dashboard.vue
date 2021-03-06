<template>
    <div>
        <b-alert :show="store.networkAnalyzer.manualMode" variant="warning">
            Network not fully analyzed because top tier is not symmetric or too large to analyze in a reasonable timeframe. <br> You can run the <a href="#" v-on:click.prevent.stop="store.isNetworkAnalysisVisible = true">network analysis</a> manually.
        </b-alert>
        <b-alert :show="store.networkHasDangers()" variant="danger">
            {{store.getNetworkDangers().description}}
            <br> See <a href="#" v-on:click.prevent.stop="store.isNetworkAnalysisVisible = true">network analysis</a> for details.
        </b-alert>
        <b-alert :show="store.networkHasWarnings()" variant="warning">
            {{store.getNetworkWarnings().description}}
            <br> See <a href="#" v-on:click.prevent.stop="store.isNetworkAnalysisVisible = true">network analysis</a> for details.
        </b-alert>
        <div class="row row-cards row-deck">

            <LazyHydrate when-visible>
                <div class="col-12">
                    <network-statistics :network="network"/>
                </div>
            </LazyHydrate>
            <LazyHydrate when-visible>

                <div class="col-lg-4 col-xl-4" v-if="!store.isSimulation">
                    <NodesCountryDistribution/>
                </div>
            </LazyHydrate>

            <LazyHydrate when-visible>
                <div class="col-lg-4 col-xl-4" v-if="!store.isSimulation">
                    <NodesVersions/>
                </div>
            </LazyHydrate>

            <LazyHydrate when-visible>
                <div class="col-lg-4 col-xl-4" v-if="!store.isSimulation">
                    <ValidatorsServerLoad/>
                </div>
            </LazyHydrate>
            <LazyHydrate when-visible>
                <div class="col-lg-6" v-if="!store.networkAnalyzer.manualMode">
                    <liveness-radar-chart/>
                </div>
            </LazyHydrate>
            <LazyHydrate when-visible>
                <div class="col-lg-6" v-if="!store.isSimulation">
                    <NetworkAnalysis analysis-type="safety">
                        <template v-slot:info>
                            <safety-info/>
                        </template>
                    </NetworkAnalysis>
                </div>
            </LazyHydrate>
            <LazyHydrate when-visible>
                <div class="col-lg-12" v-if="!store.isSimulation">
                    <NetworkAnalysis analysis-type="liveness" default-bucket-size="30D">
                        <template v-slot:info>
                            <liveness-info/>
                        </template>
                    </NetworkAnalysis>
                </div>
            </LazyHydrate>



            <LazyHydrate when-visible>
                <div v-if="network.organizations.length > 0" class="col-lg-6 col-xl-6">
                    <network-organizations/>
                </div>
            </LazyHydrate>

            <LazyHydrate when-visible>
                <div class="col-lg-6 col-xl-6">
                    <network-nodes/>
                </div>
            </LazyHydrate>

            <LazyHydrate when-visible>
                <div v-if="network.organizations.length > 0 && !store.isSimulation" class="col-lg-6 col-xl-6">
                    <network-organization-updates/>
                </div>
            </LazyHydrate>

            <LazyHydrate when-visible>
                <div class="col-lg-6 col-xl-6" v-if="!store.isSimulation">
                    <network-validator-updates/>
                </div>
            </LazyHydrate>

            <LazyHydrate when-visible v-if="!store.isSimulation">
                <div class="col-lg-6 col-12">
                    <network-horizon/>
                </div>
            </LazyHydrate>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import NodesCountryDistribution from '@/components/network/cards/nodes-country-distribution.vue';
import NodesVersions from '@/components/network/cards/nodes-versions.vue';
import ValidatorsServerLoad from '@/components/network/cards/validator-load.vue';
import {Network} from '@stellarbeat/js-stellar-domain';
import NetworkStatistics from '@/components/network/cards/network-statistics/network-statistics.vue';
import NetworkNodes from '@/components/network/cards/network-nodes.vue';
import NetworkOrganizations from '@/components/network/cards/network-organizations.vue';
import NetworkAnalysis from '@/components/network/cards/network-risk-analysis-charts/network-analysis.vue';
import {BCard, BListGroup, BListGroupItem, BBadge,BAlert} from 'bootstrap-vue';
import LivenessInfo from '@/components/network/cards/network-risk-analysis-charts/liveness-info.vue';
import SafetyInfo from '@/components/network/cards/network-risk-analysis-charts/safety-info.vue';
import NetworkValidatorUpdates from '@/components/network/cards/network-validator-updates.vue';
import NetworkOrganizationUpdates from '@/components/network/cards/network-organization-updates.vue';
import Store from '@/store/Store';
import LazyHydrate from 'vue-lazy-hydration';
import NetworkHorizon from '@/components/network/cards/network-horizon.vue';
import NetworkRiskRadarChart from '@/components/network/cards/network-risk-analysis-charts/network-risk-radar-chart.vue';

@Component({
    components: {
        LivenessRadarChart: NetworkRiskRadarChart,
        NetworkHorizon,
        NetworkOrganizationUpdates,
        LazyHydrate,
        NetworkValidatorUpdates,
        SafetyInfo,
        LivenessInfo,
        NetworkAnalysis,
        NetworkOrganizations,
        NetworkNodes,
        NetworkStatistics,
        ValidatorsServerLoad,
        NodesVersions,
        NodesCountryDistribution,
        BCard,
        BListGroup,
        BListGroupItem,
        BBadge,
        BAlert
    }
})

export default class NetworkDashboard extends Vue {
    get network(): Network {
        return this.$root.$data.store.network;
    }

    get store(): Store {
        return this.$root.$data.store;
    }
}
</script>
<style scoped>

</style>