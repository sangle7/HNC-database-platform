#Rscript expression.R <path to matrix file> <input rowname>
library("data.table")
Args=commandArgs(trailingOnly = TRUE)

#reading file
library(limma)
library(pheatmap)
zdf<-fread(Args[1],header=TRUE)
zdf = setDF(zdf)
rownames(zdf) = zdf[,1]
zdf = zdf[,-1]

rpkm_data_1 = zdf[Args[2],]


fwrite(rpkm_data_1,file = paste("app/public/expression/",Args[2],"expression.table.txt",sep=""),append=FALSE,row.names = FALSE,sep = ",", sep2 = c("","|",""),col.names = TRUE,quote = FALSE)
