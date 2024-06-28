import { z } from "zod";

export const headerLinks = [
  {
    label: "Trending",
    route: "/trending",
  },
  {
    label: "Past Problems",
    route: "/past-problems",
  },
  {
    label: "Saved Problems",
    route: "/save-problems",
  },
  {
    label: "Experts",
    route: "/experts",
  },
];

export const categoryEnum = z.enum([
  "Agriculture",
  "Astrology",
  "Automotive",
  "Career",
  "Consumer Rights",
  "Education",
  "Environment",
  "Finance",
  "Food & Nutrition",
  "Government Services",
  "Health",
  "Housing",
  "Insurance",
  "Legal",
  "Marketing",
  "Mental Health",
  "Personal Development",
  "Personal Finance",
  "Pets",
  "Politics",
  "Real Estate",
  "Relationships",
  "Retail",
  "Science",
  "Social Issues",
  "Sports",
  "Technology",
  "Transportation",
  "Travel & Tourism",
  "Other",
]);
export type categoryEnum = z.infer<typeof categoryEnum>;

export const ProblemFormDefaultValues = {
  title: "",
  category: categoryEnum.Enum.Agriculture, // Must match one of the enum values
  imageUrls: [],
};

export const CommentFormDefaultValues = {
  comment: "",
};

export const ExpertFormDefaultValues = {
  fullName: "",
  phoneNumber: "",
  country: "",
  state: "",
  city: "",
  description: "",
  category: categoryEnum.Enum.Agriculture, // Must match one of the enum values
  profilePhoto: "",
};

export const PostFormDefaultValues = {
  description: "",
  imageUrls: [],
};

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};
