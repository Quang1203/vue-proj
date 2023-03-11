const ENUM = {
  FormMode: {
    // Chỉnh sửa
    Edit: 0,
    // Thêm mới
    Add: 1,
    // Xóa 1 hàng
    DeleteOne: 2,
    // Xóa nhiều hàng
    DeleteMore: 3,
    // Nhân bản
    Replication: 4,
  },
  KeyCode: {
    // Enter
    Enter: 13,
    // Xuống
    RowUp: 38,
    // Lên
    RowDown: 40,
    // Left
    Left: 37,
    //Right
    Right: 39,
    //Backspace
    Backspace: 8,
    // Tab
    Tab: 9,
    // Ctrl
    Ctrl: 17,
    // Shift
    Shift: 16,
    // Phím A
    KeyA: 65,
    // Phím S
    KeyS: 83
  },
  PopUp: {
    // Pop-up thông báo xóa
    ShowDelete: 0,
    // Pop-up thông báo danh sách lỗi sau khi validate
    ShowError: 1,
    // Pop-up khi đóng form có sự thay đổi dữ liệu
    CloseHasChangedData: 5,
  },
};
export default ENUM;
