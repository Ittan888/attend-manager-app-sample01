# /bin/zsh

cp -n pagen.template.vue pages/index.vue

while read line
do

  if [ "`echo $line | grep /`" ]; then
    putdir=""
    dir1=${line%/*}
    dir2=${dir1%/*}

    mkdir -p "pages/${dir1}"

    cp -n pagen.template.vue "pages/${line}.vue"

    for dir in `echo $dir1 | tr "/" "\n"`
    do
      putdir="${putdir}/${dir}"
      cp -n pagen.template.vue "pages/${putdir#/*}/index.vue"
    done

  else
    cp -n pagen.template.vue "pages/${line}.vue"
  fi
  
done < ./sitemap.txt