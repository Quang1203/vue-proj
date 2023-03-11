<template >
    <div class="menu-container"  :style="{ 'min-width' : menu.widthMenu +'px' , 'width' :  menu.widthMenu +'px'}  ">
        <div class="menu__top">
            <div class="menu__top__logo"></div>
            <div class="menu__top__text" v-show="menu.isActiveToggle">MISA QLTS</div>
        </div>
        <div class="menu__bottom">
            <router-link  class="menu-item-container" to="/overview">
                <div class="menu-item">
                    <div class="menu-item__icon icon-overview icon-24 tooltip">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Tổng quan'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Tổng quan</div>
                </div>
            </router-link >
            <router-link class="menu-item-container" to="/asset">
                <div class="menu-item">
                    <div class="menu-item__icon tooltip icon-asset icon-24">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Tài sản'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Tài sản</div>
                    <div v-show="menu.isActiveToggle" class="menu-icon-down icon-24"> </div>
                </div>
            </router-link>
            <div class="menu-item-container">
                <div class="menu-item">
                    <div class="menu-item__icon tooltip icon-asset-HT-ĐB icon-24 ">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Tài sản'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Tài sản HT-ĐB</div>
                    <div v-show="menu.isActiveToggle" class="menu-icon-down icon-24"> </div>
                </div>
            </div>
            <div class="menu-item-container">
                <div class="menu-item">
                    <div class="menu-item__icon tooltip icon-tools icon-24 ">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Công cụ dụng cụ'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Công cụ dụng cụ</div>
                    <div v-show="menu.isActiveToggle" class="menu-icon-down icon-24"> </div>
                </div>
            </div>
    
            <div class="menu-item-container" >
                <div class="menu-item">
                    <div class="menu-item__icon tooltip icon-category icon-24">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Danh mục'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Danh mục</div>
                </div>
            </div>
            <div class="menu-item-container">
                <div class="menu-item">
                    <div class="menu-item__icon tooltip icon-search icon-24">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Tra cứu'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Tra cứu</div>
                    <div v-show="menu.isActiveToggle" class="menu-icon-down icon-24"> </div>
                </div>
            </div>
            <div class="menu-item-container">
                <div class="menu-item">
                    <div class="menu-item__icon tooltip icon-report icon-24">
                        <BaseTooltip v-show="!menu.isActiveToggle" :tooltipText="'Báo cáo'" :height="36"/>    
                    </div>
                    <div v-show="menu.isActiveToggle" class="menu-item__text">Báo cáo</div>
                    <div v-show="menu.isActiveToggle" class="menu-icon-down icon-24"> </div>
                </div>
            </div>
    
            <hr />
            <div class="toggle-container"  @click="btnToggleOnClick" >
                <div class="toggle icon-toogle " :class="{'icon-toogle--active' : ! menu.isActiveToggle}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseTooltip from '../base/BaseTooltip.vue';

export default {
    data() {
        return {
            menu: {
                isActiveToggle: true,
                widthMenu: 204,
            },
        };
    },
    methods: {
        /**
         * Thu gọn menu
         * Author:  Quang(29/12/2022)
         */
        btnToggleOnClick() {
            this.menu.isActiveToggle = !this.menu.isActiveToggle;
            if (this.menu.isActiveToggle) {
                this.menu.widthMenu = 204;
            }
            else {
                this.menu.widthMenu = 66;
            }
        },
    },
    components: { BaseTooltip }
}
</script>
<style scoped>
.menu-container {
    position: relative;
    min-width: 204px;
    width: 204px;
    height: 100vh;
    flex-direction: column;
    box-shadow: inset 0 1.5px 2px 0 rgb(0 0 0 / 10%);
    transition:all .2s;
    background-color: #1c3048;
}

.menu__top{
    display: flex;
    align-items: center;
}
.menu__top__logo{
    background: url("../../assets/icon/qlts-icon.png") -20px -680px !important;
    height: 36px;
    width: 36px;
    margin: 11px 15px 4px 15px;
}
.menu__top__text{
    color: #eff7ff;
    font-size: 20px;
    font-weight: 700;
    margin-top: 11px;
    margin-bottom: 4px;
    font-family: Roboto Bold;
}

.menu__bottom{
    margin-top: 15px;
    margin-left: 11px;
    margin-right: 11px;
}
.menu-item-container {
    height: 40px;
    width: 100%;
}


.menu-item {
    height: 100%;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 10px;
    padding-right: 6px;
    text-decoration: none;
    color: #000000;
}

.menu-item:hover {
    background: #1aa4c8;
    cursor: pointer;
}
.is-active{
    background: #1aa4c8;
    border-radius: 4px;
}
.menu-item__icon {
    height: 24px ;
    width: 24px ;
}
.menu-item__text {
    font-size: 14px;
    margin-left: 12px;
    text-decoration: none;
    font-weight: 500;
    /* color: #eff7ff; */
    color: #7B8798;
    flex: 1;
}
.menu-item-down{
    /* background-color: #000000 !important; */
}
.toggle-container{
    position: absolute;
    bottom: 12px;
    right: 12px ;
}
.toggle {
    border-radius: 4px;
    height: 24px;
    width: 24px;
    background: url("../../assets/icon/qlts-icon.png")  -285px -417px !important;
    /* border: 1px solid #eff7ff !important; */
    cursor: pointer;
    transition-duration: .4s;
}

hr {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: unset;
    border-bottom: unset;
    margin-bottom: 8px;
    position: absolute;
    left: 0;
    bottom: 38px;
}

.style-toggle-active{
    width: 42px;
}
.menu__toogle--active {
    border-radius: 6px;
}
.style-toggle-active{
    width: 42px;
}
.icon-toogle--active{
    transform: rotate(180deg) ;
    transition-duration: .4s;
}
.menu-item-container.router-link-active .menu-item{
    background: #1aa4c8 ;
}
.menu-item-container.router-link-active .menu-item__text, .menu-item:hover .menu-item__text{
    color: #FFFFFF ;

}
a{
    text-decoration: none !important;
}

</style>