[CmdletBinding()]
param([ValidateSet('Quick','Full')][string]$Profile='Full',[switch]$Enforce)
$Arguments=@((Join-Path $PSScriptRoot 'run_security_suite.py'),'--profile',$Profile.ToLowerInvariant());if($Enforce){$Arguments+='--enforce'};& py -3 @Arguments;exit $LASTEXITCODE
