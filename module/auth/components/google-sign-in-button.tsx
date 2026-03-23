import { supabase } from "@/integrations/supabase/supabase";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image, Text, TouchableOpacity } from "react-native";
import { toast } from "sonner-native";

export default function GoogleSignInButton() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log(response);
        if (response.data.idToken) {
          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.data.idToken,
          });
          if (error) {
            console.error(error.message);
            toast.error("Error occured. try again");
          }
        }
      } else {
        // sign in was cancelled by user
        toast.error("Signin was cancelled");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            console.error(error.message);
            toast.error("Play service not available");
            break;
          default:
            console.error(error.message);
            // some other error happened
            toast.error("Error occurred.try again");
        }
      } else {
        // an error that's not related to google sign in occurred
        console.error(
          error instanceof Error ? error.message : "An error occurred",
        );
        toast.error("Error occurred.try again");
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={signIn}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#dbdbdb",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
      activeOpacity={1}
    >
      <Image
        source={require("@/assets/google-logo.png")}
        style={{ width: 24, height: 24, marginRight: 10 }}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#757575",
          fontFamily: "Roboto-Regular",
          fontWeight: "500",
        }}
      >
        Sign in with Google
      </Text>
    </TouchableOpacity>
  );
}
