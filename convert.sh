i=1
format=".ttf"
while ( i<$argc )
  if ( $argv[i]=="-format" || $argv[i]=="--format" )
    i=i+1
    if ( i<$argc )
      format = $argv[i]
#      if ( format!=".ttf" && format!=".otf" && \
#	  format!=".pfb" && format!=".svg" )
#	Error( "Expected one of '.ttf', '.otf', '.pfb' or '.svg' for format" )
#      endif
    endif
  else
    Open($argv[i])
    Generate($argv[i]:r + format)
  endif
  i = i+1
endloop
