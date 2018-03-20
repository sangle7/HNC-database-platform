#Rscript expression.R  <path to matrix file 1> <path to matrix file 2> <input genename 1> <input genename 2> <output prefix>
library("data.table")
Args=commandArgs(trailingOnly = TRUE)

#reading file
library(limma)
library(pheatmap)
zdf1<-fread(Args[1],header=TRUE)
zdf2<-fread(Args[2],header=TRUE)
zdf = rbind(zdf1,zdf2,fill=TRUE)
zdf = setDF(zdf)
rownames(zdf) = zdf[,1]
zdf = zdf[,-1]

rpkm_data_1 = zdf[c(Args[3],Args[4]),]
rpkm_data_2 = transpose(rpkm_data_1)
rownames(rpkm_data_2) = colnames(rpkm_data_1)
colnames(rpkm_data_2) = rownames(rpkm_data_1)

fwrite(rpkm_data_2,file = paste("app/public/corr/",Args[5],".1v1.table.csv",sep=""),append=FALSE,row.names = TRUE,sep = ",", sep2 = c("","|",""),col.names = TRUE,quote = FALSE)
