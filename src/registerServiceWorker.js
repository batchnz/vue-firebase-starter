import { register } from "register-service-worker";
import consola from "consola";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      consola.info(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      consola.info("Service worker has been registered.");
    },
    cached() {
      consola.info("Content has been cached for offline use.");
    },
    updatefound() {
      consola.info("New content is downloading.");
    },
    updated() {
      consola.info("New content is available; please refresh.");
    },
    offline() {
      consola.info(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      consola.error("Error during service worker registration:", error);
    }
  });
}
