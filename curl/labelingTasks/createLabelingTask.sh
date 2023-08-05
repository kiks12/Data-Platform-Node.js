curl -X POST http://localhost:3000/labeling/api/create \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@/users/francisjamestolentino/desktop/pictures/1.png' \
  -F 'images=@/users/francisjamestolentino/desktop/pictures/2.jpg' \
  -F 'images=@/users/francisjamestolentino/desktop/pictures/3.jpg' \
  -F 'name="Ken or Barbie"' \
  -F 'description="Is it a ken or barbie"' \
  -F 'labels="Ken"' \
  -F 'labels="Barbie"' \