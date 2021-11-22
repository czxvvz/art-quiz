let fullScreenMode = true;
function changeScreenMode()
{
    if(fullScreenMode == true)
    {
        let x = document.getElementById('divMainBodyID');
        //x.classList.remove('divMainBody');
    }
    else
    {
        let x = document.getElementById('divMainBody');
        x.classList.add('divMainBody');
    }
}
changeScreenMode();