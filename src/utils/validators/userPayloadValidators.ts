import {
  UserLoginPayloadType,
  UserRegisterPayloadType,
} from "@/types/User.type";

type ValidationResultType<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errors: Record<string, string>[];
    };

export const validateRegisterPayload = (
  payload: Partial<UserRegisterPayloadType>
): ValidationResultType<UserRegisterPayloadType> => {
  const errors: Record<string, string>[] = [];

  // ? Validate name
  if (!payload.name?.trim()) {
    errors.push({ name: "Name is a required field" });
  } else if (payload.name.trim().length < 2) {
    errors.push({ name: "Name must be at least 2 characters long" });
  }

  // ? Validate username
  if (!payload.username?.trim()) {
    errors.push({ username: "Username is a required field" });
  } else if (payload.username.trim().length < 3) {
    errors.push({ username: "Username must be at least 3 characters long" });
  } else if (!/^[a-zA-Z0-9_]+$/.test(payload.username.trim())) {
    errors.push({
      username: "Username can only contain letters, numbers, and underscores",
    });
  }

  // ? Validate email
  if (!payload.email?.trim()) {
    errors.push({ email: "Email is a required field" });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email.trim())) {
      errors.push({ email: "Please enter a valid email address" });
    }
  }

  // ? Validate password
  if (!payload.password?.trim()) {
    errors.push({ password: "Password is a required field" });
  } else if (payload.password.length < 8) {
    errors.push({ password: "Password must be at least 8 characters long" });
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(payload.password)) {
    errors.push({
      password:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  // ? If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // ? Return validated data
  return {
    success: true,
    data: {
      name: payload.name!.trim(),
      username: payload.username!.trim(),
      email: payload.email!.trim().toLowerCase(),
      password: payload.password!.trim(),
    },
  };
};

export const validateLoginPayload = (
  payload: Partial<UserLoginPayloadType>
): ValidationResultType<UserLoginPayloadType> => {
  const errors: Record<string, string>[] = [];

  // ? Validate email
  if (!payload.email?.trim()) {
    errors.push({ email: "Email is a required field" });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email.trim())) {
      errors.push({ email: "Please enter a valid email address" });
    }
  }

  // ? Validate password
  if (!payload.password?.trim()) {
    errors.push({ password: "Password is a required field" });
  }

  // ? If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // ? Return validated data
  return {
    success: true,
    data: {
      email: payload.email!.trim().toLowerCase(),
      password: payload.password!.trim(),
    },
  };
};
