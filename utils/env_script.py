import sys
import os


def checkArgs(args):
    if len(args) > 2:
        print(f'Too many arguments provided. Please specify only the script and target file name')
    if len(args) == 1:
        print(
            f'Please specify the targed env file name. ex. ../configuration/development.env')


def removePrevious():
    try:
        os.remove('../.env')
        print('Removing previous environment file.')
    except:
        print('File not found.')
    else:
        print('No previous environment file found.')


checkArgs(sys.argv)
# os.remove('.env')


filename = sys.argv[1]
print(f'specified filename is {filename}')
f = open(filename)
w = open('../.env', 'w')

print(f'Writing new ENVs from {filename}')
for line in f:
    if line[0] == '#':
        print('Skipping comment line.')
        pass
    else:
        w.write(line)

f.close()
w.close()

print('Successfully added environment variables.')
