curl -X PUT http://localhost:3000/labeling/api/images \
  -H 'Content-Type: application/json' \
  -d '[{ "imageId": 13, "label": "Barbie" }, {"imageId": 14, "label": "Ken"}]' 
