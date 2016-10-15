'use strict';
this.options=[
        config={
                host:"127.0.0.1",
                port:"8081",
                path:"/rest",
                method: 'POST',
                login:"test",
                password:"test",
                delete:"$method=delete",
                logout:"$directory/logout",
                loginLink:"$directory/login",
                currentUser:"$directory/currentUser",
                update:"$method=validate&$method=update",
                belongsTo:"$directory/currentUserBelongsTo"
        }]
        
