from tkinter import *
from tkinter import messagebox


window = Tk()
window.title("Tic-Tac-Toe")
window.geometry("500x500+500+100") # width*height, left,right

turn = True
count = 0  # if count == 9 the game if finish without winner
winner = False


def check_win():
    global winner
    win_combinations = [
        [(0, 0), (0, 1), (0, 2)],
        [(1, 0), (1, 1), (1, 2)],
        [(2, 0), (2, 1), (2, 2)],
        [(0, 0), (1, 0), (2, 0)],
        [(0, 1), (1, 1), (2, 1)],
        [(0, 2), (1, 2), (2, 2)],
        [(0, 0), (1, 1), (2, 2)],
        [(0, 2), (1, 1), (2, 0)]
    ]

    for combination in win_combinations:
        if buttons[combination[0][0]][combination[0][1]]["text"] == buttons[combination[1][0]][combination[1][1]][
            "text"] == buttons[combination[2][0]][combination[2][1]]["text"] != " ":
            for (r, c) in combination:
                buttons[r][c].config(bg="yellow")
            messagebox.showinfo("Tic-Tac-Toe",
                                f"{buttons[combination[0][0]][combination[0][1]]['text']} is the winner!")
            winner = True


    # בדוק אם יש תיקו
    if count == 9 and not winner:
        messagebox.showinfo("Tic-Tac-Toe", "It's a tie!")
        window.quit()

    if winner:
        window.quit()


def click(b):
    global turn, count
    if b["text"] == " " and turn == True:
        b["text"] = 'X'
        count += 1
        turn = False
    elif b["text"] == " " and turn == False:
        b["text"] = 'O'
        count += 1
        turn = True
    else:
        messagebox.showerror("Tic-Tac-Toe","Please press other button!")
    check_win()


buttons = []
for row in range(3):
    button_row = []
    for col in range(3):
        button = Button(window, text=" ", font=("Impact", 20), height=4, width=12, command=lambda r=row, c=col: click(buttons[r][c]))
        button.grid(row=row, column=col)
        button_row.append(button)
    buttons.append(button_row)





window.mainloop()