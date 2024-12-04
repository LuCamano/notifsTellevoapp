const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require('cors');
const serviceAccount = require("./serviceAccount.json"); // Reemplaza con la ruta a tu archivo JSON de la cuenta de servicio

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/sendPushNotification", async (req, res) => {
  const newMessage = req.body;

  try {
    const response = await admin.messaging().sendEachForMulticast(newMessage);
    res.status(200).json({ message: "Notificación enviada correctamente" });
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
    res.status(500).json({ message:"Error al enviar la notificación" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
