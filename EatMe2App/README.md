This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
![Website preview][preview.png]

## Dockerization and deployment

1. Install docker desktop.
2. In terminal, navigate to the `EatMe2App` directory.
3. Run: 

```
docker build -t eatme .
```

This will create a docker image for you.

4. Deploy:

```
docker run -it -p 8080:80 eatme
```

5. Open browser on `localhost:8080` to see the website.

The app currently displays real predications for 59 images.