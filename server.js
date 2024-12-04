const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json"); // Reemplaza con la ruta a tu archivo JSON de la cuenta de servicio

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

app.post("/sendPushNotification", async (req, res) => {
  const { title, message, tokens } = req.body;

  const payload = {
    notification: {
        title: title,
        body: message,
    },
  };

  try {
    const response = await admin.messaging().sendToDevice(tokens, payload);
    res.status(200).send("Notificación enviada correctamente");
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
    res.status(500).send("Error al enviar la notificación");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
