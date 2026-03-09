import HomeView from "@/views/HomeView.vue";
import ProfileSetup from "@/views/ProfileSetup.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView, name: "Home | Blur" },
    { path: "/sign-up", component: SignUpView, name: "Sign Up | Blur" },
    { path: "/sign-in", component: SignInView, name: "Sign In | Blur" },
    {
      path: "/profile-setup",
      component: ProfileSetup,
      name: "Profile Setup | Blur",
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
