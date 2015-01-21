library(ggplot2)

d <- read.table('steps-from-goal.txt',
                sep=":", 
                col.names=c('step', 'count'), 
                fill=FALSE, 
                strip.white=TRUE)

print(ggplot(d, aes(x=step, y=count)) + 
        geom_bar(stat='identity') +
        xlab('Steps From Goal') + 
        ylab('Valid Board Configurations') + 
        scale_x_continuous(breaks=seq(min(d$step), max(d$step))) + 
        ggtitle('Eight Puzzle Board Combinations From Goal Using A*'))
