import axios from "axios";
import BaseToastMassage from '../components/base/BaseToastMassage.vue';
export default {
  name: "CallAPIJS",
  component:[BaseToastMassage],
  methods: {

    assetUrl() {
      return "http://localhost:41911/api/Assets";
    },

    /**
     * Lấy danh sách tài sản có phân trang
     * @param {int} pageNumber Số trang
     * @param {int} pageSize Số lượng bản ghi trên 1 trang
     * @param {string} keyWord Từ khóa tìm kiếm
     * @param {string} assetTypeID ID Loại tài sản muốn lọc
     * @param {string} departmentID ID mã bộ phận muốn lọc
     * @returns Danh sách tài sản được phân trang
     * Author:  Quang (15/02/2023)
     */
    async getDataFilterAndPaging(
      pageNumber,
      pageSize,
      keyWord,
      assetTypeID,
      departmentID
    ) {
      try {
        const response = await axios.get(
          `${this.assetUrl()}/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&keyWord=${keyWord}&departmentID=${departmentID}&assetTypeID=${assetTypeID}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Lấy thông tin chi tiết của 1 tài sản
     * @param {string} assetID ID tài sản muốn lấy thông tin chi tiết
     * @returns Đối tượng tài sản muốn lấy thông tin chi tiết
     * Author:  Quang (15/02/2023)
     */
    async getAssetByID(assetID) {
      try {
        const response = await axios.get(`${this.assetUrl()}/${assetID}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Lấy mã mới tài sản
     * @returns Mã tài sản mới
     * Author:  Quang (15/02/2023)
     */
    async getNewAssetCode() {
      try {
        const response = await axios.get(`${this.assetUrl()}/new-code`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Check trùng mã
     * @param {string} assetID ID tài sản của mã cần kiểm tra
     * @param {string} assetCode Mã tài sản muốn kiểm tra
     * @returns 1 nếu trùng, 0 nếu mã có thể sử dụng
     * Author:  Quang (15/02/2023)
     */
    async checkDuplicateCode(assetID, assetCode) {
      try {
        const response = await axios.get(
          `${this.assetUrl()}/check-duplicate-code?assetID=${assetID}&assetCode=${assetCode}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Thêm mới 1 tài sản
     * @param {object} asset Đối tượng tài sản cần thêm mới
     * @returns ID tài sản vừa thêm mới
     * Author:  Quang (15/02/2023)
     */
    async postNewAsset(asset) {
      // try {
        const response = await axios.post(`${this.assetUrl()}`, asset);
        return response.data;
      // } catch (error) {
          // console.log(error);
      // }
    },

    /**
     * Chỉnh sửa 1 tài sản
     * @param {string} assetID ID tài sản cần chỉnh sửa
     * @param {object} asset Đối tượng tài sản cần chỉnh sửa
     * @returns ID tài sản vừa thêm mới
     * Author:  Quang (15/02/2023)
     */
    async putAsset(assetID, asset) {
        const response = await axios.put(
          `${this.assetUrl()}/${assetID}`, asset
        );
        return response.data;
    },

    /**
     * Xóa 1 tài sản
     * @param {string} assetID ID tài sản cần xóa
     * @returns ID tài sản vừa thêm mới
     * Author:  Quang (15/02/2023)
     */
    async deleteOneAsset(assetID) {
      try {
        const response = await axios.delete(`${this.assetUrl()}/${assetID}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * Xóa nhiều tài sản
     * @param {string} assetIDList List ID tài sản cần xóa  được nối chuỗi
     * @returns ID tài sản vừa thêm mới
     * Author:  Quang (15/02/2023)
     */
    async deleteMoreAsset(assetIDList) {
      try {
        const response = await axios.post(
          `${this.assetUrl()}/delete-more`,
          assetIDList,
          { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    /**
    * Export file to exel
    * @param {string} keyWord từ khóa đang tìm kiếm 
    * @param {string} departmentID ID phòng ban muốn lọc 
    * @param {string} assetTypeID ID loại tài sản muốn lọc
    * @returns danh sách tài sản tìm kiếm
    * Author:  Quang (16/02/2023)
    */
    async exportFileToExcel(keyWord, departmentID, assetTypeID) {
      try {
        const response = await axios.get(
          `${this.assetUrl()}/excel?keyword=${keyWord}&departmentID=${departmentID}&assetTypeID=${assetTypeID}&pageSize=-1`, 
          {
            headers: {
              "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",  // trả về là một tệp Excel
            },
            responseType: "blob", // lưu trữ dữ liệu nhị phân, được sử dụng để lưu trữ các loại dữ liệu khác nhau, chẳng hạn như hình ảnh, tệp âm thanh hoặc video.
          }
        );
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
