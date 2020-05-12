import {SEX_FEMALE, SEX_MALE, SEX_NOTHING} from "../const/const type_user_chats";

export function sex_serializer(sex) {
    switch (sex) {
        case 'женский':
            return SEX_FEMALE;
        case "мужской":
            return SEX_MALE;
        case "не известно":
            return SEX_NOTHING;
        default:
            return sex;
    }

}
