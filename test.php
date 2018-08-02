<?php
    include("database.php");
    $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
  
        $admin_name=mysql_real_escape_string($post['name']);
        $admin_email=mysql_real_escape_string($post['email']);
        $admin_pass=mysql_real_escape_string($post['pass']);                
        if (filter_var($admin_email, FILTER_VALIDATE_EMAIL) == true)
        {
            $query = "select * from users where email='$admin_email'";
            $run=mysql_query($query);
            if(mysql_num_rows($run)==1)
            {   
                echo "<h2>This email is already Registered, please try another!</h2>";
                exit();
            }
            else
            {
                $insert = " insert into users(name,email,password) values('$admin_name','$admin_email','$admin_pass')";
                if (mysql_query($insert)) 
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