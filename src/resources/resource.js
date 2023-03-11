const RESOURCE = {
    Dialog:{
        DialogTitleAdd : "Thêm mới tài sản",
        DialogTitleEdit : "Sửa tài sản",
        DialogTitleReplicate : "Nhân bản tài sản",
    },
    Table:{
        TableNodata : "Không có dữ liệu."
    },
    ToastMessage:{
        ToastContentSuccessSave: "Lưu dữ liệu thành công.",
        ToastContentSuccessEdit : "Chỉnh sửa dữ liệu thành công.",
        ToastContentSuccessReplicate : "Nhân bản dữ liệu thành công.",
        ToastContentSuccessDeleteOne : "Đã xóa tài sản được chọn thành công.",
        ToastContentSuccessDeleteMore : "Đã xóa những tài sản được chọn thành công.",
        ToastContentErrorSave : "Lưu dữ liệu không thành công.",
        ToastContentErrorEdit : "Chỉnh sứa không thành công. Có lỗi xảy ra.",
        ToastContentErrorReplicate : "Nhân bản không thành công. Có lỗi xảy ra.",
        ToastContentErrorDeleteOne : "Không thể xóa tài sản được chọn.",
        ToastContentErrorDeleteMore : "Không thể xóa những tài sản được chọn.",
        ToastContentSuccessExportFile: "Xuất file dữ liệu thành công.",
        ToastContentErroExportFile : "Xuất file dữ liệu thất bại.",
        ToastContentErrorInValidData : "Dữ liệu đầu vào không hợp lệ !",
        ToastContentErrorException : "Có lỗi xảy ra. Vui lòng thử lại sau !",
    },
    PopUpDelete: {
        PopUpContentDeleteNoData : "Bạn chưa chọn tài sản nào để xóa.",
        PopUpContentDeleteOne : "Bạn có muốn xóa tài sản?",
        PopUpContentDeleteMore : " tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
        PopUpContentCantDelete : "Không thể xóa tài sản này vì đã có chứng từ phát sinh.",
        PopUpContentCantDeleteMore : "n tài sản được chọn Không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.",
    },
    PopUpShowChange:{
        PopUpContentHasChangedFormAdd : "Bạn có muốn huỷ bỏ khai báo tài sản này?",
        PopUpContentHasChangedFormEdit : "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu sự thay đổi này?",
    },
    NoticeRequired:{
        DuplicateAssetCode: "Mã tài sản đã tồn tại trong hệ thống.",
        RequiredAssetCode: "Cần phải nhập thông tin Mã tài sản.",
        RequiredAssetName: "Cần phải nhập thông tin Tên tài sản.",
        RequiredDepartmentCode: "Cần phải nhập thông tin Mã bộ phận sử dụng.",
        RequiredAssetTypeCode: "Cần phải nhập thông tin Mã loại tài sản.",
        RequiredAmount: "Cần phải nhập Số lượng tài sản.",
        RequiredCost: "Cần phải nhập Nguyên giá tài sản.",
        RequiredDepreciationRate: "Cần phải nhập Tỷ lệ hao mòn.",
        RequiredDepreciationRateExact: "Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng.",
        RequiredDepreciationValue: "Cần phải nhập Giá trị hao mòn.",
        RequiredDepreciationValueExact: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá.",
        RequiredLifeTime: "Cần phải nhập Số năm sử dụng.",
        RequiredDateBuy: "Cần phải nhập Ngày mua.",
        RequiredDateUse: "Cần phải nhập Ngày bắt đầu sử dụng.",
        RequiredMaxLength: "Độ dài vượt quá cho phép."
    }
}
export default RESOURCE;