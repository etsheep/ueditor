UE.registerUI('notes', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        // execCommand: function() {
        //     alert('execCommand:' + uiName)
        // }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: '批注',
        //添加额外样式,指定icon图标,这里默认使用一个重复的icon
        // cssRules: 'background-position: -500px 0;',
        //点击时执行的命令
        label: '批注',
        showIcon: false,
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            // editor.execCommand(uiName);
            // editor.setDisabled(['notes']);
            UE.getEditor('editor').execCommand( 'forecolor', '#ff0000' );
            // UE.dom.domUtils.setStyles(self.ue.body, {
            //     'color': 'red','font-family' : "'Microsoft Yahei','Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif", 'font-size' : '14px'
            // });
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName)
        console.log(state);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

function disableBtn() {
    console.log('disabelBtn');
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == 'enable') {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
}
