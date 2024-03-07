from rest_framework import serializers
from .models import User, Group

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'password', 'nickname', 'group_names')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            group_names = validated_data.pop('group_names', [])
            user = super().create(validated_data)
            for group_name in group_names:
                group, _ = Group.objects.get_or_create(name=group_name)
                user.groups.add(group)
            return user

class LoginSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=255, write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    def validate(self, data):
        user_id = data.get('user_id')
        password = data.get('password')
        userid = User.objects.get(user_id=user_id)
        re_password = User.objects.get(password=password)
        if user_id == userid.user_id:
            if password == re_password.password:
                return data

            else:
                raise serializers.ValidationError('ログイン失敗')
            
class UserUpdateSerializer(serializers.Serializer):
    nickname = serializers.CharField(max_length=30, allow_blank=True)
    comment = serializers.CharField(max_length=100, allow_blank=True)

    def update(self, instance, validated_data):
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance