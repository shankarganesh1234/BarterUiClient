export class CommonUtils {

    /**
     * Every message will begin with the following format
     * interestId: <message>
     * @param message
     */
    encodeMessage(interestId: number, message: string): string {
        return interestId + ":" + message;
    }

    /**
     * Return the message without the interest id
     * @param message
     * @returns {any}
     */
    decodeMessage(message: string): string {
        if(message == null || message ==='')
            return null;

        return message.split(":")[1];
    }

}