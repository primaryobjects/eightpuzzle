d <- read.table('steps-from-goal.txt',
                sep=":", 
                col.names=c('id', 'name'), 
                fill=FALSE, 
                strip.white=TRUE)

mp <- barplot(d$name, names.arg=d$id, axes = TRUE)

par(cex.lab=0.7, cex.axis=0.7)

barplot(d$name, names.arg=d$id, las=2, axes = TRUE, cex.axis=1)

axis(1, at = mp, labels = rep('', 32), tcl = -0.25, cex.lab=0.7, cex.axis=0.7)
