
export default {
  name: "CommonJS",
  methods: {
    /**
     * Format ngày
     * @param {date} inputDate datetime cần validate
     * Author: Đức Quang (29/12/2022)
     */
    formartDate(inputDate) {
      try {
        if (inputDate) {
          inputDate = new Date(inputDate);
          let date = inputDate.getDate();
          date = date < 10 ? `0${date}` : date;
          let month = inputDate.getMonth() + 1;
          month = month < 10 ? `0${month}` : month;
          let year = inputDate.getFullYear();
          inputDate = `${date}/${month}/${year}`;
        } else {
          inputDate = "";
        }
        return inputDate;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Conert ngày
     * @param {date} inputDate datetime cần convert
     * Author: Đức Quang (18/01/2023)
     */
    convertDate(dateFormart) {
      try {
        if (dateFormart != "") {
          let date = dateFormart.slice(0, 2);
          date = parseInt(date);
          let month = dateFormart.slice(3, 5);
          month = parseInt(month);
          let year = dateFormart.slice(6, 10);
          const dateFull =
            year +
            "-" +
            (month < 10 ? `0${month}` : month) +
            "-" +
            (date < 10 ? `0${date}` : date) + "T00:00:00";
          return dateFull;
        } 
        else {
          dateFormart = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    formartNumber(num) {
      if (num) {
        return num.formart();
      } else {
        return "";
      }
    },
    formartMoney(money) {
      money = parseFloat(money).toFixed(0);
      money = money.toString();
      return money.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    getDataAsset() {
      return [
        {
          AssetCode: "TS001",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng Hành chính kế toán",
          Quantity: 2,
          Cost: 10000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS002",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          DepartmentCode: "PTK",
          DepartmentName: "Phòng Thư ký",
          Quantity: 2,
          Cost: 11000000,
          LifeTime: 7,
          DepreciationRate: 14.29,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "06/01/2023",
          DateUse: "06/01/2023",
        },
        {
          AssetCode: "TS003",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PTCTH",
          DepartmentName: "Phòng Tài chính tổng hợp",
          Quantity: 2,
          Cost: 10500000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "08/01/2023",
          DateUse: "08/01/2023",
        },
        {
          AssetCode: "TS004",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 20000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS005",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 10000000,
          LifeTime: 7,
          DepreciationRate: 14.29,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS006",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          DepartmentCode: "PTCTH",
          DepartmentName: "Phòng Tài chính Tổng hợp",
          Quantity: 2,
          Cost: 10000000,
          LifeTime: 7,
          DepreciationRate: 14.29,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS007",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 15000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS008",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PTCTH",
          DepartmentName: "Phòng Tài chính Tổng hợp",
          Quantity: 2,
          Cost: 19000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS009",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 8000000,
          LifeTime: 7,
          DepreciationRate: 14.29,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS010",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PTK",
          DepartmentName: "Phòng Thư ký",
          Quantity: 2,
          Cost: 10000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS011",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 11500000,
          LifeTime: 7,
          DepreciationRate: 14.29,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS012",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PTCTH",
          DepartmentName: "Phòng Tài chính Tổng hợp",
          Quantity: 2,
          Cost: 9000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS013",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 10000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS014",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PTCTH",
          DepartmentName: "Phòng Tài chính Tổng hợp",
          Quantity: 2,
          Cost: 10000000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS015",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng hành chính kế toán",
          Quantity: 2,
          Cost: 19500000,
          LifeTime: 5,
          DepreciationRate: 20,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
        {
          AssetCode: "TS016",
          AssetName: "Dell Inspiron 3467",
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          DepartmentCode: "PTK",
          DepartmentName: "Phòng Thư ký",
          Quantity: 2,
          Cost: 20000000,
          LifeTime: 7,
          DepreciationRate: 5,
          DepreciationValue: 1000000,
          YearFollow: "2023",
          DateBuy: "04/01/2023",
          DateUse: "04/01/2023",
        },
      ];
    },
    getDataDepartment() {
      return [
        {
          DepartmentCode: "PHCKT",
          DepartmentName: "Phòng Hành chính kế toán",
        },
        {
          DepartmentCode: "PTCTH",
          DepartmentName: "Phòng Tài chính Tổng hợp",
        },
        {
          DepartmentCode: "PTK",
          DepartmentName: "Phòng Thư ký",
        },
      ];
    },
    getDataAssetType() {
      return [
        {
          AssetTypeCode: "MTXT",
          AssetTypeName: "Máy vi tính xách tay",
          LifeTime: 5,
          DepreciationRate: 6.67,
        },
        {
          AssetTypeCode: "MTDB",
          AssetTypeName: "Máy vi tính để bàn",
          LifeTime: 7,
          DepreciationRate: 5.33,
        },
      ];
    },
  },
};
Number.prototype.formart = function () {
  let n = 0;
  let x = 3;
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};
Number.formart = function (num) {
  let n = 0;
  let x = 3;
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return num.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};
