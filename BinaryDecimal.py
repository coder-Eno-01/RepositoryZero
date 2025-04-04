option = input("Binary to Decimal or the reverse?(1 or 2 or 'Q' to quit)\n")

while not option.upper() == 'Q':
    if not option.isdigit():
        print("Please enter a positive number (or 'Q' to quit).\n")

    else:
        if int(option) == 1:                                     ## Converting from binary to decimal
            num = input("Enter the binary number you want to convert.\n")
            decimalNum = 0
            index = 0
            binaryDigits = [bit for bit in num.strip()]          ## Creating a list of the bits in the binary number
            binaryDigits.reverse()                               ## Reversing the list so that we start with the least significant bit

            for bit in binaryDigits:                             ## Applying the conversion
                decimalNum += int(bit) * (2 ** index)
                index += 1

            print(f"{num} in decimal is {decimalNum}\n")
        elif int(option) == 2:
            num = int(input("Enter the decimal number you want to convert:\n"))
            binaryNum = []

            while num > 0:
                binaryNum.append(num % 2)
                num = num // 2

            binaryNum.reverse()
            bNum = ""

            for bit in binaryNum:
                bNum += str(bit)

            print(f"{num} in binary is {bNum}")

    option = input("Binary to Decimal or the reverse?(1 or 2 or Q to quit)\n")

print("Hello World")
