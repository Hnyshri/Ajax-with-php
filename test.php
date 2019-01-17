<?php
    include("database.php");
    $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
  
        $admin_name=mysqli_real_escape_string($data,$post['name']); // it is use for escape the special character in string
        $admin_email=mysqli_real_escape_string($data,$post['email']);
        $admin_pass=mysqli_real_escape_string($data,$post['pass']);                
        if (filter_var($admin_email, FILTER_VALIDATE_EMAIL) == true) // filter var use for all validateion and sanitization
        {
            $query = "select * from users where email='$admin_email'";
            $run=mysqli_query($data,$query);
            if(mysqli_num_rows($run)==1)
            {   
                echo "<h2>This email is already Registered, please try another!</h2>";
                exit();
            }
            else
            {
                $insert = " insert into users(name,email,password) values('$admin_name','$admin_email','$admin_pass')";
                if (mysqli_query($data,$insert)) 
                {
                    echo "<h2>Registration Successful, Thanks!</h2>";
                }
                
            }
        }
        else{
            echo "<h2>Enter the valid email</h2>";
            exit();
        }         
?>