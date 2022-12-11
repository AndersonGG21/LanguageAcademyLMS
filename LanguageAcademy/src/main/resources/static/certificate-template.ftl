<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap'); margin: 0px; background-color: #f2f3f8; display: flex;justify-content: center;font-family: 'Poppins', sans-serif;
color= black" leftmargin="0" >

    <table class="cert" style="border: 10px solid crimson; width: 700px; height: 100px;">
        <tr>
            <td align="center" class="crt_logo" style="margin: 0px; background-color: #f2f3f8";>
                <img src="http://drive.google.com/uc?export=view&id=1S4yPMR_2vYXSNriZBeGs9xht-KWbltcv"
                    class="certSign" alt="sign" style="width: 160px;">
            </td>
        </tr>
        <tr>
            <td align="center">
                <h1 class="crt_title" style="margin-top: 30px;font-size: 40px;letter-spacing: 1px;color: crimson;">Proof Of Completion
                    <h2>Congratulations to:</h2>
                    <h1 class="colorGreen crt_user" style="display: inline-block;width: 80%;padding: 5px 25px;margin-bottom: 0px;padding-bottom: 0px;font-size: 40px;border-bottom: 1px dashed #cecece; color: black">${student}</h1>
                    <h3 class="afterName" style="font-weight: 100;color: #383737;">For successfully completing</h3>
                    <h3 class="course_name" style="font-size: 30px;font-weight: bolder;color: black;">${course}</h3>
            </td>
        </tr>
        <tr>
            <td align="center">
                <img src="http://drive.google.com/uc?export=view&id=1OY0byHMVz510qtYd0QC3lmW-PFllHQOb"
                    class="certSign" alt="sign" style="width: 250px;height: 200px;margin-left: 50px;margin-bottom: 0px;">
                <h3>Anderson Garces</h3>
                <h3>Idioom</h3>
            </td>
        </tr>
    </table>


</body>

</html>