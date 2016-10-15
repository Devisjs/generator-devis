@echo off
setlocal enabledelayedexpansion

set "Myvar="
for %%x in (%*) do (
    
   call set "Myvar=%%Myvar%% %%x"
   
   
)

npm run-script%Myvar%