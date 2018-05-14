

 export PS1="\e[0;31m[\u@\h \W]\$ \e[m "
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions

export TZ=America/Los_Angeles

THEIP=$(curl ipinfo.io/ip)

export PS1="\[\033[01;35m\]\D{%r}
\[\033[0;34m\]\u@"$THEIP"
\[\033[01;32m\]\w $\[\033[0m\] ";


export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
