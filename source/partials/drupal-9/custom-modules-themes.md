To move modules, use the following commands:

  ```bash{promptUser:user}
  mkdir -p $DESTINATION/web/modules/custom
  cp -r $SOURCE/web/modules/custom $DESTINATION/web/modules/custom
  # From $DESTINATION:
  git add web/modules/
  git commit -m "Copy custom modules"
  ```
To move themes, use the following commands:

  ```bash{promptUser:user}
  mkdir -p $DESTINATION/web/themes/custom
  cp -r $SOURCE/web/themes/custom $DESTINATION/web/themes/custom
  # From $DESTINATION:
  git add web/themes/
  git commit -m "Copy custom themes"
  ```