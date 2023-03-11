<template >
    <div class="header-container">
        <div class="header__left">Danh sách tài sản</div>
        <div class="header__right">
            <div class="header__right__text">Sở tài chính</div>
            <div class="header__right__select-year">
                <div class="header__right__select-year__text">Năm</div>
                <!-- <input type="number" value="2022" min="2000" max="2023" /> -->
                <div class="select-year__number">{{ yearNumber }}</div>
                <div class="header__right__select-year__btns">
                    <div class="header__right__select-year__btns-up"  @click="increaseNumber"></div>
                    <div class="header__right__select-year__btns-down"  @click="decreaseNumber"></div>
                </div>
            </div>
            <div class="header__right__icon icon-24 icon-notify tooltip">
                <span class="tooltiptext">Thông báo</span>
            </div>
            <div class="header__right__icon icon-24 icon-square"></div>
            <div class="header__right__icon icon-24 icon-ask"></div>
            <div class="header__right__icon icon-24 icon-avatar"></div>
            <div class="header__right__icon-btns-down"></div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            yearNumber: 2020,
        }
    },
    methods: {
        /***
        * Click tăng giá trị trên combobox number
        * Author:  Quang (30/12/2022)
        */
        increaseNumber() {
            try {
                this.yearNumber++;
            } catch (error) {
                console.log(error);
            }
        },
        /***
        * Click giảm giá trị trên combobox number
        * Author:  Quang (30/12/2022)
        */
        decreaseNumber() {
            try {
                if (this.yearNumber > 1)
                    this.yearNumber--;
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>
<style scoped>
.header-container {
    height: 44px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 23px;
}
.header__left{
    font-weight: 700;
}
.header__right {
    display: flex;
    align-items: center;
    padding-right: 3px;
}

/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button,
input[type=number] {
    -webkit-appearance: none;
    margin: 0;
    height: 14px;
    width: 27px;
    font-size: 13px;
} */
.header__right__text {
    margin-right: 26px;
}

.header__right__select-year {
    background-color: rgba(26, 164, 200, .2);
    padding: 9px 8px 7px 11px;
    border-radius: 3px;
    width: 112px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 27px;
}

.header__right__select-year .select-year__number {
    /* flex: 1 !important; */
}

.header__right__select-year__btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
}

.header__right__select-year__btns-up {
    width: 7px;
    height: 5px;
    background: url("../../assets/icon/qlts-icon.svg") -28px -338px !important;
    background-repeat: no-repeat;
    cursor: pointer;
}

.header__right__select-year__btns-down {
    width: 7px;
    height: 5px;
    background: url("../../assets/icon/qlts-icon.svg") -205px -343px;
    cursor: pointer;
}

.header__right__icon {
    margin-right: 20px;
    cursor: pointer;
}

.header__right__icon.icon-avatar {
    margin-right: 8px;
}

.header__right__icon-btns-down {
    width: 7px;
    height: 5px;
    background: url("../../assets/icon/qlts-icon.svg") -205px -343px;
    cursor: pointer;
}
</style>