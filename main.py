# User Defined Constants
text = """""".strip().split("\n")
LINE_LENGTH = 50
ENDING = "#"
PADDING = "#"

# Calculations
EFFECTIVE_LENGTH = LINE_LENGTH - 2*len(ENDING) - 2*len(PADDING)

running_length = 0
final = []
for line in text:
    running_length = 0
    lines = [[]]
    for word in line.split(" "):
        if running_length + len(lines[-1]) + len(word) > EFFECTIVE_LENGTH:
            # Push this word to the new line
            running_length = len(word)
            lines.append([word])
        else:
            lines[-1].append(word)
            running_length += len(word)
        
    final.extend(lines)

final = [" ".join(line) for line in final]
output = [ENDING*LINE_LENGTH]
for line in final:
    left_spaces = EFFECTIVE_LENGTH // 2 - len(line) // 2
    output.append(ENDING + PADDING + " "*(left_spaces) + line + " "*(EFFECTIVE_LENGTH - left_spaces - len(line)) + PADDING + ENDING)
output.append(ENDING*LINE_LENGTH)

output = "\n".join(output)
print(output)