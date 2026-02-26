import Avatar from "@/components/Avatar";
import { useImageUpload } from "@/hooks/useImageUpload";
import ProfileForm from "@/module/profile/components/ProfileForm";
import { useEditUserMutation, useUserQuery } from "@/module/profile/hooks";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const EditProfile = () => {
  const { data: user } = useUserQuery();
  const updateMutation = useEditUserMutation();
  const { preview, uploading, pickAndUpload } = useImageUpload({
    bucket: "avatars",
    path: user?.id,
    onUpload: (url) => {
      if (!user?.auth_user_id) {
        toast.error("No Active Session");
        return;
      }
      updateMutation.mutate(
        { id: user.auth_user_id, data: { avatar_url: url } },
        {
          onSuccess: () => {
            toast.success("Profile Picture Updated");
          },
        },
      );
    },
    onError: () => {},
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="my-10">
        <Avatar
          uri={preview ?? user?.avatar_url}
          showEditButton={true}
          uploading={uploading}
          onPress={pickAndUpload}
        />
      </View>
      <ProfileForm
        onSubmit={(data) => {
          if (!user?.auth_user_id) {
            toast.error("No Active Session");
            return;
          }
          updateMutation.mutate(
            { id: user.auth_user_id, data: data },
            {
              onSuccess: () => {
                toast.success("Profile Updated Successfully");
                router.navigate("/(tabs)/profile");
              },
            },
          );
        }}
        isSubmitting={updateMutation.isPending}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
