#Rscript expression.R <path to matrix file> <input rowname>
library("data.table")
Args=commandArgs(trailingOnly = TRUE)

#reading file
library(limma)
library(pheatmap)
zdf<-fread(Args[1],header=TRUE)
zdf=data.frame(zdf,row.names= 1)

rpkm_data_1 = zdf[Args[2],]


fwrite(rpkm_data_1,file = paste(Args[2],"expression.table.txt",sep=""),append=FALSE,row.names = TRUE,sep = ",", sep2 = c("","|",""),col.names = TRUE,quote = FALSE)
