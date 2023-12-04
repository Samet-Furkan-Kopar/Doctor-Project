import { checkSchema,validationResult } from "express-validator";
import AppError from "../utils/appError.js";

import Content from "../models/contentModel.js";

const contentValidate = [
  checkSchema({
    seoTitle: {
      notEmpty: {
        errorMessage: "seoTitle Boş Geçilemez.",
      },
      isString: {
        errorMessage: "seoTitle String bir ifade Olmalıdır.",
      },
    },
    seoUrl: {
      notEmpty: {
        errorMessage: "seoUrl Boş Geçilemez.",
      },
      isString: {
        errorMessage: "seoUrl String bir ifade Olmalıdır.",
      },
      custom: {
        options: async (value) => {
          let content = await Content.findOne({
            seoUrl: value,
          });
          if (content !== null) {
            return Promise.reject();
          }
        },
        errorMessage: "seoUrl zaten kullanılıyor. ",
      },
    },
    seoDescription: {
      notEmpty: {
        errorMessage: "seoDescription Boş Geçilemez.",
      },
      isString: {
        errorMessage: "seoDescription String bir ifade Olmalıdır.",
      },
    },
    page: {
      notEmpty: {
        errorMessage: "page Boş Geçilemez.",
      },
      isString: {
        errorMessage: "page String bir ifade Olmalıdır.",
      },
      custom: {
        options: async (value) => {
          let check = true;
          const pages = [
            "homepage",
            "about",
            "contact",
            "blog",
            "campaigns",
            "courses",
            "course-list",
            "temporary",
            "privacy",
            "termuse",
            "faq",
          ];
          for (const page of pages) {
            if (String(page) === String(value)) {
              check = false;
            }
          }
          if (check) {
            return Promise.reject();
          }
        },
        errorMessage: "Girmiş oldugunuz içeriği kontrol ediniz. ",
      },
    },
    type: {
      notEmpty: {
        errorMessage: "type Boş Geçilemez.",
      },
      isString: {
        errorMessage: "type String bir ifade Olmalıdır.",
      },
      custom: {
        options: async (value) => {
          let check = true;
          const types = [
            "sliderArena",
            "codingQualityArena",
            "advanceTab",
            "coursePresentation",
            "eventPresentation",
            "shopPresentation",
            "blogPresentation",
            "bannerArena",
            "aboutArena",
            "buttonArena",
            "contactUs",
            "contactForm"

          ];
          for (const type of types) {
            if (String(type) === String(value)) {
              check = false;
            }
          }
          if (check) {
            return Promise.reject();
          }
        },
        errorMessage: "Girmiş oldugunuz içeriği kontrol ediniz. ",
      },
    },
    content: {
      notEmpty: {
        errorMessage: "content Boş Geçilemez.",
      },
      isString: {
        errorMessage: "content String bir ifade Olmalıdır.",
      },
    },
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = [];
      for (let i = 0; i < errors.errors.length; i++) {
        msg.push(errors.errors[i].msg);
      }
      throw new AppError(msg, 422);
    } else {
      next();
    }
  },
];

const contentValidations = {
  contentValidate,
};

export default contentValidations;
