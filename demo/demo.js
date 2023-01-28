
$(document).ready(function () {
    // alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    var data = []
    $.ajax({
        url:'data.json',
        method:'GET',
        datatype:'json',
        success: function(response) {
            ajaxobj.getall(response);
            data = response
        },
        error: function(e){
            console.error(e)
        }
    })

    

    function clearForm(item) {
        let key = $(item).attr('id') 
        $(`#${key} .form-group span`).text('');
        $(`#${key} .form-group`).removeClass('has-error');
        $(`#${key}cnname`).val('');
        $(`#${key}enname`).val('');
        $(`#${key}tel`).val('');
        $(`#${key}email`).val('');
    }

    // 新增表單
        // 新增按鈕
    $("#form-add").click(function () {
        
        var cnname = $("#addcnname").val().trim();
        var enname = $("#addenname").val().trim();
        var tel = $("#addtel").val().trim();
        var email = $("#addemail").val().trim();
        var sex = $("input:radio:checked[name='addsex']").val() === 'man' ?  '0' : '1' ;
        var s_sn = (Number(data[data.length - 1].s_sn) + 1 ).toString();

        let flag = false;

        // 表單驗證
        $("#add .form-group input:not([type=radio])").each(function (index, element) {

            if($(element).attr('id') === 'addcnname' && cnname === ''){
                console.log('yes')
                $("#add .cnname-error").text("請輸入中文姓名");
                $(element).parent().addClass('has-error');
                return false;
            }

            $("#add .cnname-error").text("");

            if($(element).attr('id') === 'addtel' && tel === ''){
                console.log('ok')
                $("#add .tel-error").text("請輸入手機號碼");
                $(element).parent().addClass('has-error');
                return false;
            }

            if($(element).attr('id') === 'addtel' && tel !== '' && !Number.isInteger(+tel)){
                $("#add .tel-error").text("請輸入數字");
                $(element).parent().addClass('has-error');
                return false;
            }

            if($(element).attr('id') === 'addtel' && tel.length !== 10){
                $("#add .tel-error").text("手機號碼必須為十碼");
                $(element).parent().addClass('has-error');
                return false;
            }

            $("#add .tel-error").text("");
            

            if($(element).attr('id') === 'addemail' && email == ''){
                $("#add .email-error").text("請輸入電子信箱");
                $(element).parent().addClass('has-error');
                return false;
            }

            if($(element).attr('id') === 'addemail' && !email.includes("@")){
                $("#add .email-error").text("電子信箱須包含@");
                $(element).parent().addClass('has-error');
                return false;
            }

            $("#add .email-error").text("");
            $(element).parent().removeClass('has-error')


            if($(element).attr('id') === 'addemail' && $("#add .cnname-error").text() == '' && $("#add .tel-error").text() == '' && $("#add .email-error").text() == ''){
                flag = true
            }
        })
        
        if(flag !== true) return 

        data = [...data,{cnname:cnname,email:email,enname:enname,s_sn: s_sn,sex:sex,tel:tel}];
        refreshTable(data);

        clearForm(add);
        $("#add").modal('hide');
    })
        // 重整按鈕
    $("#reset-add").click(function () {
        clearForm(add);
    })
        // 取消按鈕
    $("#cancel-add").click(function () {
        clearForm(add);
        $("#add").modal('hide');
    })

    

    // 搜尋表單
        // 搜尋按鈕
    $("#form-search").click(function () {
        
            var cnname = $("#searchcnname").val().trim();
            var enname = $("#searchenname").val().trim();
            var tel = $("#searchtel").val();
            var email = $("#searchemail").val().trim();
            var sex = $("input:radio:checked[name='searchsex']").val() === 'man' ?  '0' : $("input:radio:checked[name='searchsex']").val() === 'woman' ? '1' : '';
    
            newData = data.filter((item,i) =>{ 

                switch(true){
                    case(cnname !== '' && cnname.toLowerCase() === item.cnname.toLowerCase() ):
                        return item
                        break;
                    case(enname !== '' && enname.toLowerCase() === item.enname.toLowerCase() ):
                        return item
                        break;
                    case(tel !== '' && tel === item.tel ):
                        return item
                        break;
                    case(email !== '' && email.toLowerCase() === item.email.toLowerCase() ):
                        return item
                        break;
                    case(sex !== '' && sex === item.sex ):
                        return item
                        break;
                }
                
            })

            refreshTable(newData);
    
            clearForm(search);
            $("#search").modal('hide');
    })
        // 重整按鈕
    $("#reset-search").click(function () {
        clearForm(search);
    })
        // 取消按鈕
    $("#cancel-search").click(function () {
        clearForm(search);
        $("#search").modal('hide');
    })

    
    // 修改表單
    $('#modify').on('show.bs.modal', function (e) {
        let info = $(e.relatedTarget).data('info') 

        $('#modifycnname').val(info.cnname)
        $('#modifyenname').val(info.enname)
        $('#modifytel').val(info.tel)
        $('#modifyemail').val(info.email)
        $('#modify .modal-title').text(`修改表單#${info.s_sn}`)
        info.sex === '0'? $("#man").attr('checked','checked') : $("#woman").attr('checked','checked')
    })
    
        // 修改按鈕
    $("#form-modify").on('click',function (e) {
        
        let cnname = $("#modifycnname").val().trim();
        let enname = $("#modifyenname").val().trim();
        let tel = $("#modifytel").val().trim();
        let email = $("#modifyemail").val().trim();
        let sex = $("input:radio:checked[name='modifysex']").val() === 'man' ?  '0' : '1' ;
        let s_sn = $("#modify .modal-title").text().split("#")[1]

        let flag = false;

        // 表單驗證
        $("#modify .form-group input:not([type=radio])").each(function (index, element) {
            if($(element).attr('id') === 'modifycnname' && cnname === ''){
                $("#modify .cnname-error").text("請輸入中文姓名");
                $(element).parent().addClass('has-error');
                return false;
            }

            $("#modify .cnname-error").text("");
            


            if($(element).attr('id') === 'modifytel' && tel === ''){
                console.log('ok')
                $("#modify .tel-error").text("請輸入手機號碼");
                $(element).parent().addClass('has-error');
                return false;
            }

            if($(element).attr('id') === 'modifytel' && tel !== '' && !Number.isInteger(+tel)){
                $("#modify .tel-error").text("請輸入數字");
                $(element).parent().addClass('has-error');
                return false;
            }

            if($(element).attr('id') === 'modifytel' && tel.length !== 10){
                $("#modify .tel-error").text("手機號碼必須為十碼");
                $(element).parent().addClass('has-error');
                return false;
            }

            $("#modify .tel-error").text("");
            
            if($(element).attr('id') === 'modifyemail' && email == ''){
                $("#modify .email-error").text("請輸入電子信箱");
                $(element).parent().addClass('has-error');
                return false;
            }

            if($(element).attr('id') === 'modifyemail' && !email.includes("@")){
                $("#modify .email-error").text("電子信箱須包含@");
                $(element).parent().addClass('has-error');
                return false;
            }

            $("#modify .email-error").text("");
            $(element).parent().removeClass('has-error')


            if($(element).attr('id') === 'modifyemail' && $("#modify .cnname-error").text() == '' && $("#modify .tel-error").text() == '' && $("#modify .email-error").text() == ''){
                flag = true
            }
        })
        
        if(flag !== true) return 

        data = data.map((item,i) => {
            if(item.s_sn === s_sn) {
                return {s_sn:s_sn,cnname:cnname,enname:enname,tel:tel,email:email,sex:sex}
            }
            return item
        })
        
        refreshTable(data);
        $("#modify").modal('hide');
    })
        // 重整按鈕
    $("#reset-modify").click(function () {
        let s_sn = $("#modify .modal-title").text().split("#")[1]
        let info = oldData.filter((item,i) => item.s_sn === s_sn)
        console.log(info)
        $('#modifycnname').val(info.cnname)
        $('#modifyenname').val(info.enname)
        $('#modifytel').val(info.tel)
        $('#modifyemail').val(info.email)
        info.sex === '0'? $("#man").attr('checked','checked') : $("#woman").attr('checked','checked')
    })
        // 取消按鈕
    $("#cancel-modify").click(function () {
        $("#modify").modal('hide');
    })
    // 刪除表單
    $('#delete-modal').on('show.bs.modal', function (e) {
        let info = $(e.relatedTarget).data('info') 
        $('#delete-modal .modal-title').text(`刪除資料#${info.s_sn}`)
        info.sex === '0'? $("#man").attr('checked','checked') : $("#woman").attr('checked','checked')
    })
    // 刪除鈕
    $("#delete").click(function () {
        let s_sn = $("#delete-modal .modal-title").text().split("#")[1]
        data = data.filter((item,i) => item.s_sn !== s_sn);
        refreshTable(data);
        $("#delete-modal").modal('hide');
    }) 
    // 取消刪除按鈕
    $("#cancel-delete").click(function () {
        $("#delete-modal").modal('hide');
    })

    $('.phone').popover({
        container : 'body',
    })

});
function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    
        let i = 0;
        let inter = setInterval(function() {
            if(i < data.length){
                var strsex = '';
                if (data[i].sex == 0)
                    strsex = '男';
                else
                    strsex = '女';
                phone = data[i].tel.slice(0,4) + '-' +data[i].tel.slice(4,7) + '-' + data[i].tel.slice(7)
                
                var row = $("<tr  class='animate__animated animate__fadeInUp'></tr>");
                row.append($(`<td data-toggle='tooltip' data-container='body'  data-placement='right' title='[${strsex}]${data[i].cnname}(${data[i].enname})'></td>`).html(data[i].cnname));
                row.append($('<td data-toggle="tooltip" data-container="body" data-placement="right" title="['+ strsex + ']'+ data[i].cnname +'('+ data[i].enname +')"></td>').html(data[i].enname));
                row.append($("<td></td>").html(strsex));
                row.append($("<td class='phone' data-container='body' data-toggle='popover'  data-content='聯絡方式:"+ phone +"' ></td>" ).html(data[i].tel));
                row.append($("<td></td>").html(data[i].email));
                row.append($("<td></td>").html('<button type="button" id="modifybutton' + data[i].s_sn + '" class="btn modifybutton" data-toggle="modal" data-target="#modify" data-info='+ JSON.stringify(data[i]) + ' >修改 <span class="glyphicon glyphicon-list-alt"></span></button>'));
                row.append($("<td></td>").html('<button type="button" id="deletebutton' + data[i].s_sn + '" class="btn deletebutton" data-toggle="modal" data-target="#delete-modal" data-info='+ JSON.stringify(data[i]) + '  >刪除 <span class="glyphicon glyphicon-trash"></span></button>'));
                $("#cardtable").append(row);
                i++;
            }else{
                clearInterval(inter)
            }
        },250)
       
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
}

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}


AjaxObject.prototype.getall = function (response) {
  refreshTable(response);
}

