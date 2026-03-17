import AddBlurtView from "@/views/AddBlurtView.vue";
import HomeView from "@/views/HomeView.vue";
import MyCirclesView from "@/views/MyCirclesView.vue";
import ProfileSetupView from "@/views/ProfileSetupView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingsView from "@/views/SettingsView.vue";
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
      component: ProfileSetupView,
      name: "Profile Setup | Blur",
    },
    { path: "/add-blurt", component: AddBlurtView, name: "Add Blurt | Blur" },
    { path: "/profile", component: ProfileView, name: "Profile | Blur" },
    { path: "/settings", component: SettingsView, name: "Settings | Blur" },
    {
      path: "/my-circles",
      component: MyCirclesView,
      name: "My Circles | Blur",
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
